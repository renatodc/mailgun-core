namespace MailgunCore.Model
{
    public class Mail
    {
        public int ID { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string MailSubject { get; set; }
        public string BodyHtml { get; set; }
        public string BodyPlain { get; set; }
        public string MailDate { get; set; }
    }
}