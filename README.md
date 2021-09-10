---
page_type: sample
languages:
- javascript
products:
- azure
- azure-nodejs
- azure-resource-manager
- azure-storage
- azure-virtual-network
- azure-virtual-machines
description: "This sample demonstrates how to manage your Azure virtual machines using a Node.js client and specifically how to: create a virtual machine, start a virtual machine, stop a virtual machine, list virtual machines, delete a virtual machine"
urlFragment: compute-node-manage-vm
---

# Azure Virtual Machines Management Samples - Node.js

This sample demonstrates how to manage your Azure virtual machines using a Node.js client and specifically how to:

- Create a virtual machine
- Start a virtual machine
- Stop a virtual machine
- List virtual machines
- Delete a virtual machine

**On this page**

- [Run this sample](#run)
- [What does index.js do?](#sample)

<a id="run"></a>
## Run this sample

1. If you don't already have it, [get Node.js](https://nodejs.org).

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
    [Azure CLI](https://azure.microsoft.com/documentation/articles/resource-group-authenticate-service-principal-cli/):

    ```azurecli
    az ad sp create-for-rbac --name YOUR-SERVICE-PRINCIPAL-NAME
    ```

    Other ways to create a service principal:
    * [Azure portal](https://azure.microsoft.com/documentation/articles/resource-group-create-service-principal-portal/)
    * [PowerShell](https://azure.microsoft.com/documentation/articles/resource-group-authenticate-service-principal/)


1. Set the following environment variables using the information from the service principle that you created.

    ```
    export AZURE_SUBSCRIPION_ID={your subscription id}
    export AZURE_CLIENT_ID={your client/app id}
    export AZURE_CLIENT_SECRET={your client secret/password}
    export AZURE_TENANT_ID={your tenant id as a guid OR the domain name of your org <contosocorp.com>}
    ```

    > [AZURE.NOTE] On Windows, use `set` instead of `export`.

1. Run the sample.

    ```
    node index.js
    ```

    When this script is complete, it returns `success YOUR-RESOURCE-GRUOP-NAME`.

1. To clean up after index.js, run the cleanup script, using the resource group name from the previous script's success statement.

    ```
    node cleanup.js YOUR-RESOURCE-GRUOP-NAME
    ```

<a id="sample"></a>
## What does index.js do?

The sample creates, lists, restarts and deletes virtual machines. It starts by logging in using your service principal.


## More information

Please refer to [Azure SDK for Node](https://github.com/Azure/azure-sdk-for-node) for more information. Additionally, here some other helpful links:

- [Azure JavaScript Development Center](https://docs.microsoft.com/en-us/azure/developer/javascript/)
- [Azure Virtual Machines documentation](https://azure.microsoft.com/services/virtual-machines/)
- [Learning Path for Virtual Machines](https://azure.microsoft.com/documentation/learning-paths/virtual-machines/)

If you don't have a Microsoft Azure subscription you can get a FREE trial account [here](http://go.microsoft.com/fwlink/?LinkId=330212).

