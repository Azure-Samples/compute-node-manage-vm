const { DefaultAzureCredential } = require("@azure/identity");
const { ResourceManagementClient } = require("@azure/arm-resources");

const clientId = process.env["AZURE_CLIENT_ID"];
const domain = process.env["AZURE_TENANT_ID"];
const secret = process.env["AZURE_CLIENT_SECRET"];
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

if (!clientId || !domain || !secret || !subscriptionId) {
  console.log("Default credentials couldn't be found");
}

// Call this file with `node cleanup.js <resourceGroupName>`
// where <resourceGroupName> is the name of the resource group to be deleted
const resourceGroupName = process.argv[2];
if (!resourceGroupName) {
  console.log("resourceGroupName couldn't be found");
}

const deleteResourceGroup = async () => {
  console.log("\nDeleting resource group: " + resourceGroupName);
  return await resourceClient.resourceGroups.deleteMethod(resourceGroupName);
};

const credentials = new DefaultAzureCredential();
const resourceClient = new ResourceManagementClient(credentials, subscriptionId);

const main = async () => {
  try {
    console.log(
      "Deleting the resource group can take few minutes, so please be patient :)."
    );

    await deleteResourceGroup();
    console.log("Successfully deleted the resourcegroup: " + resourceGroupName);
  } catch (err) {
    console.log(err);
  }
};

main()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });
