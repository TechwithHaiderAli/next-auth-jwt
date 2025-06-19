import nodemailer from "nodemailer"

// Looking to send emails in production? Check out our Email API/SMTP product!
const  transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3132acb2943b8a",
    pass: "2e3d8eabf32ef2"
  }
});


export async  function sendEmail(email:string,token:any){
    const info = await transport.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: `<p> This is a Verfication Link Email from Next App Click the Link Below <a href=${`${process.env.DOMAIN}/verifyemail?token=${token}`}> Click Me B**ch </a>`,

})}

export async  function sendVerified(email:string){
    const info = await transport.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: email,
    subject: "Verification Successfull",
    text: "Next APP", // plain‑text body
    html:"<h1>You are Now a Verfied User</h1>"

})}