﻿using Microsoft.AspNetCore.Mvc;

namespace MailgunCore.Model
{
    public class Mailgun
    {
        public string Recipient { get; set; }
        public string Sender { get; set; }
        public string From { get; set; }
        public string Subject { get; set; }
        [BindProperty(Name = "body-plain")]
        public string BodyPlain { get; set; }
        [BindProperty(Name = "body-html")]
        public string BodyHtml { get; set; }
    }
}