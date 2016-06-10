/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */
'use strict';

var util = require('util');
var msRestAzure = require('ms-rest-azure');
var ResourceManagementClient = require('azure-arm-resource').ResourceManagementClient;
var ComputeManagementClient = require('azure-arm-compute');

_validateEnvironmentVariables();
_validateParameters();
var clientId = process.env['CLIENT_ID'];
var domain = process.env['DOMAIN'];
var secret = process.env['APPLICATION_SECRET'];
var subscriptionId = process.env['AZURE_SUBSCRIPTION_ID'];
var resourceGroupName = process.argv[2];
var vmName = process.argv[3];
var resourceClient, computeClient;

function deleteVirtualMachine(callback) {
  console.log(util.format('\nDeleting virtualMachine : %s. This operation takes time. Hence, please be patient :).', vmName));
  return computeClient.virtualMachines.deleteMethod(resourceGroupName, vmName, callback);
}

function deleteResourceGroup(callback) {
  console.log('\nDeleting resource group: ' + resourceGroupName);
  return resourceClient.resourceGroups.deleteMethod(resourceGroupName, callback);
}


function _validateEnvironmentVariables() {
  var envs = [];
  if (!process.env['CLIENT_ID']) envs.push('CLIENT_ID');
  if (!process.env['DOMAIN']) envs.push('DOMAIN');
  if (!process.env['APPLICATION_SECRET']) envs.push('APPLICATION_SECRET');
  if (!process.env['AZURE_SUBSCRIPTION_ID']) envs.push('AZURE_SUBSCRIPTION_ID');
  if (envs.length > 0) {
    throw new Error(util.format('please set/export the following environment variables: %s', envs.toString()));
  }
}

function _validateParameters() {
  if (!process.argv[2] || !process.argv[3]) {
    throw new Error('Please provide the resource group and the virtual machine name by executing the script as follows: "node cleanup.js <resourceGroupName> <vmName>".');
  }
}

//Entrypoint of the cleanup script
msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, function (err, credentials) {
  if (err) return console.log(err);
  resourceClient = new ResourceManagementClient(credentials, subscriptionId);
  computeClient = new ComputeManagementClient(credentials, subscriptionId);
  deleteVirtualMachine(function (err, result) {
    if (err) return console.log('Error occured in deleting the virtual machine: ' + vmName + '\n' + util.inspect(err, { depth: null }));
    console.log('Successfully deleted the virtual machine: ' + vmName);
    console.log('\nDeleting the resource group can take few minutes, so please be patient :).');
    deleteResourceGroup(function (err, result) {
      if (err) return console.log('Error occured in deleting the resource group: ' + resourceGroupName + '\n' + util.inspect(err, { depth: null }));
      console.log('Successfully deleted the resourcegroup: ' + resourceGroupName);
    });
  });
});