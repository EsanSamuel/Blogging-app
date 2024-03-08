import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "esansamuel555@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmailMessage = async (toEmail: any, name: any) => {
  await transporter.sendMail({
    from: "noreply@blogapp.com",
    to: toEmail,
    subject: "You're in🤩, Welcome to Blog App🎉!",
    html: `<p>
    
    Dear <strong>${name}</strong>,
    
    <br>Welcome to Blog App! We're thrilled to have you on board and excited to see you join our community of avid readers and writers.
    
    <br>At Blog App, we're committed to providing you with a platform where you can discover engaging content, share your thoughts and ideas, and connect with like-minded individuals from around the world.
    
    <br>Here's what you can expect from us:

    <br>1. <strong>A Diverse Range of Content:</strong> Explore a wide variety of topics, ranging from technology and lifestyle to travel and beyond. There's something for everyone!

    <br>2. <strong>Personalized Recommendations:</strong> Based on your interests and reading history, we'll curate personalized recommendations to help you discover new and interesting articles.
    
    <br>3.<strong> Engage with the Community:</strong> Connect with fellow bloggers, leave comments, and engage in discussions to share your perspectives and insights.
    
   <br>4. <strong>Create Your Own Blog:</strong> Ready to share your own stories or expertise? Start your own blog on Blog App and let your voice be heard.

   <br>Thank you for choosing Blog App! We can't wait to embark on this blogging journey with you.

   <br>Happy reading and writing!

   <br>Warm regards,
   <br>Esan Samuel
   <br>CEO and founder
   <br>Blog App



    </p>`,
  });
};
