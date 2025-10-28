export const welcomeTemplate = ({ userName, dashboardUrl }: { userName: string, dashboardUrl: string }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Back to Dumcel Cloud</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black text-white font-sans">
    <div class="max-w-lg mx-auto my-8 bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-700 text-center py-6 text-2xl font-bold">
        Dumcel Cloud Deployment Platform
      </div>

      <!-- Content -->
      <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4">Welcome back 👋</h2>

        <p class="text-gray-300 mb-4">
          Hi <span class="font-medium">${userName}</span>,  
          you have successfully logged in to your Dumcel Cloud account.
        </p>

        <p class="text-gray-400 mb-8">
          You can now manage your deployments, monitor activity, and explore new
          updates on your dashboard.
        </p>

        <p class="text-gray-300 mb-8">
          We've credited <span class="text-white font-medium">10 free credits</span> to your account — use them to
          deploy your first application on Dumcel Cloud.
        </p>

        <a
          href="{${dashboardUrl}}"
          target="_blank"
          class="inline-block bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg"
        >
          Go to Dashboard
        </a>

        <p class="text-sm text-gray-500 mt-8">
          If this login wasn’t initiated by you, please reset your password immediately.
        </p>
      </div>

      <!-- Footer -->
      <div class="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        &copy; 2025 Dumcel Cloud Deployment Platform. All rights reserved.
      </div>
    </div>
  </body>
</html>
`
}

export const resetPasswordTemplate = ({
  userName,
  otp,
}: {
  userName: string;
  otp: string;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black text-white font-sans">
    <div class="max-w-lg mx-auto my-8 bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-700 text-center py-6 text-2xl font-bold">
        Dumcel Cloud Password Reset
      </div>

      <!-- Content -->
      <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4">Reset Your Password 🔐</h2>

        <p class="text-gray-300 mb-4">
          Hi <span class="font-medium">${userName}</span>,  
          we received a request to reset your Dumcel Cloud account password.
        </p>

        <p class="text-gray-400 mb-6">
          Use the following One-Time Password (OTP) to proceed with your password reset:
        </p>

        <div class="bg-gray-800 text-center text-3xl font-bold text-blue-400 tracking-widest py-4 rounded-lg mb-8">
          ${otp}
        </div>

        <p class="text-gray-400 mb-8">
          This OTP is valid for <span class="text-white font-medium">10 minutes</span>.  
          If you didn’t request this reset, please ignore this email.
        </p>

        <p class="text-sm text-gray-500 mt-8">
          For security reasons, never share this OTP with anyone.
        </p>
      </div>

      <!-- Footer -->
      <div class="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        &copy; 2025 Dumcel Cloud Deployment Platform. All rights reserved.
      </div>
    </div>
  </body>
</html>`;
};

export const creditPurchaseTemplate = ({
  userName,
  dashboardUrl,
  credits,
  amount,
}: {
  userName: string;
  dashboardUrl: string;
  credits: number;
  amount: number;
}) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Credits Purchase Confirmation</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black text-white font-sans">
    <div class="max-w-lg mx-auto my-8 bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-700 text-center py-6 text-2xl font-bold">
        Dumcel Cloud Deployment Platform
      </div>

      <!-- Content -->
      <div class="p-8">
        <h2 class="text-2xl font-semibold mb-4">Credits Purchased Successfully 💳</h2>

        <p class="text-gray-300 mb-4">
          Hi <span class="font-medium">${userName}</span>,  
          thank you for purchasing credits on <span class="text-white font-medium">Dumcel Cloud</span>.
        </p>

        <div class="bg-gray-800 rounded-lg p-4 mb-8">
          <p class="text-gray-300 mb-2">Purchase Details:</p>
          <p class="text-gray-100"><strong>Credits:</strong> ${credits}</p>
          <p class="text-gray-100"><strong>Amount Paid:</strong> ₹${amount}</p>
        </div>

        <p class="text-gray-400 mb-8">
          Your account has been updated with the purchased credits.  
          You can now deploy more applications, scale existing projects, or upgrade your resources.
        </p>

        <a
          href="${dashboardUrl}"
          target="_blank"
          class="inline-block bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg"
        >
          View My Dashboard
        </a>

        <p class="text-sm text-gray-500 mt-8">
          If you did not authorize this transaction, please contact support immediately.
        </p>
      </div>

      <!-- Footer -->
      <div class="text-center text-gray-500 text-sm py-6 border-t border-gray-800">
        &copy; 2025 Dumcel Cloud Deployment Platform. All rights reserved.
      </div>
    </div>
  </body>
</html>`;
};
