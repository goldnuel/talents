export default ({ name, paymentLink }: { name: string, paymentLink: string }) => ({
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registration Successful</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 10px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

                    <tr>
                        <td style="background-color: #5E2CA5; padding: 40px 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome!</h1>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 24px;">
                                Dear ${name},
                            </p>
                            
                            <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 24px;">
                                Thank you for registering with us! Your account has been successfully created.
                            </p>
                            
                            <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 24px;">
                                To complete your registration and activate your account, please make a payment of <strong style="color: #5E2CA5;">₦1,000.00</strong>.
                            </p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f6fb; border-left: 4px solid #5E2CA5; border-radius: 4px; margin-bottom: 30px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="margin: 0 0 10px; color: #5E2CA5; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Required</p>
                                        <p style="margin: 0; color: #333333; font-size: 24px; font-weight: 700;">₦1,000.00</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 10px 0 30px;">
                                        <a href="${paymentLink}" style="display: inline-block; background-color: #5E2CA5; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: 600; transition: background-color 0.3s;">
                                            Make Payment
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 20px; color: #666666; font-size: 14px; line-height: 21px;">
                                Once your payment is confirmed, and your entry approved you'll receive an email containing other further instructions.
                            </p>
                            
                            <p style="margin: 0; color: #666666; font-size: 14px; line-height: 21px;">
                                If you have any questions or need assistance, please don't hesitate to contact our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background-color: #f8f6fb; padding: 30px 40px; text-align: center; border-top: 1px solid #e8e8e8;">
                            <p style="margin: 0 0 10px; color: #999999; font-size: 13px; line-height: 20px;">
                                Best regards,<br>
                                <strong style="color: #5E2CA5;">Goldnuel Talents</strong>
                            </p>
                            <p style="margin: 10px 0 0; color: #999999; font-size: 12px; line-height: 18px;">
                                © ${new Date().getFullYear()} All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
});