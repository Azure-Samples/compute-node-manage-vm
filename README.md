---
services: compute
platforms: nodejs
author: eduardk
---

# Manage Azure Virtual Machines with Node.js

This sample demonstrates how to manage your Azure virtual machines using a node.js client.

**On this page**

- [Run this sample](#run)
- [What does index.js do?](#sample)

<a id="run"></a>
## Run this sample

1. If you don't already have it, [get node.js](https://nodejs.org).

1. Clone the repository.

    ```
    git clone https://github.com/Azure-Samples/compute-node-manage-vm.git
    ```

1. Install the dependencies.

    ```
    cd compute-node-manage-vm
    npm install
    ```

1. Create an Azure service principal either through
    [Azure CLI](https://azure.microsoft.com/documentation/articles/resource-group-authenticate-service-principal-cli/),
    [PowerShell](https://azure.microsoft.com/documentation/articles/resource-group-authenticate-service-principal/)
    or [the portal](https://azure.microsoft.com/documentation/articles/resource-group-create-service-principal-portal/).

1. Set the following environment variables using the information from the service principle that you created.

    ```
    export AZURE_SUBSCRIPION_ID={your subscription id}
    export CLIENT_ID={your client id}
    export APPLICATION_SECRET={your client secret}
    export DOMAIN={your tenant id as a guid OR the domain name of your org <contosocorp.com>}
    ```

    > [AZURE.NOTE] On Windows, use `set` instead of `export`.

1. Run the sample.

    ```
    node index.js
    ```

1. To clean up after index.js, run the cleanup script.

    ```
    node cleanup.js <resourceGroupName> <websiteName>
    ```

<a id="sample"></a>
## What does index.js do?

The sample creates, lists, restarts and deletes virtual machines
It starts by logging in using your service principal.

```javascript
msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, function (err, credentials))
```

The sample then creates a virtual machine,

```javascript
createVM(function (err, result));

```
then it displays information about the VM created.

```javascript
computeClient.virtualMachines.get(resourceGroupName, vmName, function (err, result))
```

Next, the sample stops and then starts the virtual machine created,
```javascript
computeClient.virtualMachines.powerOff(resourceGroupName, vmName, function (err, result))
computeClient.virtualMachines.start(resourceGroupName, vmName, function (err, result))
```
and lists all virtual machines under the current subscription.
```javascript
computeClient.virtualMachines.listAll(function (err, result))
```

Finally, the code in the file 'cleanup.js' deletes the virtual machine created, as well as the resource group
```javascript
deleteVirtualMachine(function (err, result))
deleteResourceGroup(function (err, result))
```

## More information
Please refer to [Azure SDK for Node](https://github.com/Azure/azure-sdk-for-node) for more information.
