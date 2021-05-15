/**
 * Created by nikol.badanjak on 13-May-21.
 */

global with sharing class ppdmEditorController {
    public String accountName { get; set; }
    public static Account account { get; set; }

    @RemoteAction
    global static Account getAccount(String accountName) {
        account = [SELECT Id, Name, Phone, Type, NumberOfEmployees
        FROM Account WHERE Name = :accountName];
        return account;
    }

}