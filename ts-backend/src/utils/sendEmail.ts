import * as SparkPost from "sparkpost";
const client = new SparkPost(process.env.SPARK_POST_API_KEY as string);

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirm Email",
      html: `
      <html><
      body>
      <p>Testing SparkPost</p>
      <a href="${url}"> Confirm your email </a>
      </body>
      </html>`
    },
    recipients: [
      {
        address: recipient
      }
    ]
  });

  console.log(response);
};
