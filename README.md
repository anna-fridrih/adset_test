# adset_test
# Project Setup and Build Instructions

This project is built using Node.js. Follow the instructions below to set up the project, install dependencies, clean up old builds, and run the development server.

---

## 🚀 Prerequisites

Ensure that the following software is installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://npmjs.com/) (comes with Node.js)

You can verify the installation by running:

```bash
node -v
npm -v

🛠️ Installation

Follow these steps to set up and build the project:

1️⃣ Clean Up Previous Builds

Remove any old dist, node_modules, and package-lock.json to start fresh:

rm -rf dist node_modules package-lock.json

2️⃣ Install Dependencies

After cleaning up, install all necessary dependencies:

npm install

3️⃣ Build the Project

Once the dependencies are installed, you can build the project and start the development server:

npm run build
npm run dev

This will compile the TypeScript code and start the server in development mode.

🧹 Clean Cache and Build Artifacts

If you need to clean up old caches or build files, use the following commands:

rm -rf node_modules/.cache
rm -rf dist
npx tsc --build --clean

This will clear the cache in the node_modules/.cache directory and remove the old build files in the dist folder, ensuring a fresh start for the next build.

🔧 Additional Commands
	•	Run Tests: If tests are configured for the project, you can run them using the following command:

npm test


	•	Run the Application in Production Mode: To build and run the project in production mode, use the following commands:

npm run build
npm start

🛠️ Troubleshooting
	•	If you encounter issues with missing dependencies or broken builds, try removing node_modules and reinstalling the dependencies:

rm -rf node_modules
npm install


	•	If you receive warnings about outdated or deprecated packages, you can update them with:

npm update


	•	If there are issues related to Jest, try clearing the Jest cache:

npx jest --clearCache

🌍 Environment Setup

Ensure that Node.js is installed on your system. You can download the latest version from here.

To manage different Node.js versions, you can use nvm, a version manager for Node.js.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
