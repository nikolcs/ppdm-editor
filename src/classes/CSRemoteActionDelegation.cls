/**
 * Created by nikol.badanjak on 13-May-21.
 */

global with sharing class CSRemoteActionDelegation {


    @RemoteAction
    global static Account getAccount(String accountName) {
        Account account = [SELECT Id, Name, Phone, Type, NumberOfEmployees
        FROM Account WHERE Name = :accountName];
        return account;
    }
//
//    @RemoteAction
//    global static CommercialProduct getCPs() {
//        Account account = [SELECT Id, Name, Phone, Type, NumberOfEmployees
//        FROM Account];
//        return account;
//    }
}