using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using RestSharp;
using RestSharp.Authenticators;
using MailgunCore.Model;
using MailgunCore.Properties;

namespace MailgunCore.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/Mail")]
    public class MailController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Mail> Get()
        {
            string selectQuery = "SELECT * FROM Mail";
            MySqlConnection sqlConnection = new MySqlConnection(Resources.connString);
            sqlConnection.Open();
            MySqlCommand sqlCommand = new MySqlCommand(selectQuery, sqlConnection);
            MySqlDataAdapter adapter = new MySqlDataAdapter(sqlCommand);
            DataTable dt = new DataTable();
            adapter.Fill(dt);
            List<Mail> mails = new List<Mail>();
            foreach (DataRow row in dt.Rows)
            {
                mails.Add(new Mail
                {
                    ID = Convert.ToInt32(row["ID"]),
                    Sender = row["Sender"].ToString(),
                    Recipient = row["Recipient"].ToString(),
                    MailSubject = row["MailSubject"].ToString(),
                    BodyHtml = row["BodyHtml"].ToString(),
                    BodyPlain = row["BodyPlain"].ToString(),
                    MailDate = row["MailDate"].ToString()
                });
            }
            sqlConnection.Close();
            return mails;
        }

        [HttpPost]
        public IActionResult Post([FromForm]Mailgun msg)
        {
            string insertSql = "INSERT INTO Mail(Sender, Recipient, MailSubject, BodyHtml, BodyPlain, MailDate) VALUES (@Sender,@Recipient,@MailSubject,@BodyHtml,@BodyPlain,'{0:g}')";
            DateTime timestamp = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, "US/Pacific");
            string insertQuery = string.Format(insertSql, timestamp);
            MySqlConnection sqlConnection = new MySqlConnection(Resources.connString);
            sqlConnection.Open();
            MySqlCommand sqlCommand = new MySqlCommand(insertQuery, sqlConnection);
            sqlCommand.Parameters.AddWithValue("@Sender", msg.Sender);
            sqlCommand.Parameters.AddWithValue("@Recipient", msg.Recipient);
            sqlCommand.Parameters.AddWithValue("@MailSubject", msg.Subject);
            sqlCommand.Parameters.AddWithValue("@BodyHtml", msg.BodyHtml);
            sqlCommand.Parameters.AddWithValue("@BodyPlain", msg.BodyPlain);
            sqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return CreatedAtAction(nameof(Post), msg);
        }

        [HttpPut]
        public IActionResult Put([FromBody]Mail msg)
        {
            try
            {
                string mailgunAPI = "https://api.mailgun.net/v3";
                string domain = "cratemail.org";
                RestClient client = new RestClient(mailgunAPI);
                client.Authenticator = new HttpBasicAuthenticator("api", Resources.mailgunKey);
                RestRequest request = new RestRequest("{domain}/messages", Method.POST);
                request.AddParameter("domain", domain, ParameterType.UrlSegment);
                request.AddParameter("from", msg.Sender);
                request.AddParameter("to", msg.Recipient);
                request.AddParameter("subject", msg.MailSubject);
                request.AddParameter("text", msg.BodyPlain);
                IRestResponse response = client.Execute(request);
                return Ok(new { message = response.ErrorMessage, result = response.IsSuccessful });
            }
            catch(Exception exception)
            {
                return BadRequest(new { message = exception.Message, result = false });
            }
        }
    }
}
