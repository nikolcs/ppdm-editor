import _ from 'lodash';

export class VFRemotingService {
    static invokeRemoteAction(
        config,
        params
    ) {
        return new Promise((resolve, reject) => {
            let actionArguments = [config.remoteActionName];
            const remoteActionCallback = (result, event) => {
                if (event.status) {
                    if (typeof result === 'string') {
                        try {
                            // tslint:disable-next-line: no-parameter-reassignment
                            result = JSON.parse(result);
                        } catch (e) {
                            console.debug(
                                `Result from ${config.remoteActionName} remote action is not in JSON format.`
                            );
                        }
                    }

                    return resolve(result);
                } else if (event.type === 'exception') {
                    alert('There was an error while performing the remote action call!');
                    console.error('Exception: ', event.type, config.remoteActionName);

                    return reject(event);
                } else {
                    alert('There was an error while performing the remote action call.');

                    return reject(event);
                }
            };
            if (params && params.length > 0) {
                actionArguments = actionArguments.concat(params);
            }
            actionArguments.push(remoteActionCallback);
            if (config.options) {
                actionArguments.push(config.options);
            }

            CS.PPDM.vfRemotingManager.invokeAction.apply(
                CS.PPDM.vfRemotingManager,
                actionArguments
            );
        });
    }

    static syncInvoker = () => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.syncInvoker,
            },
            []
        );
    };

    static getPackages = () => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getPackages,
            },
            []
        );
    };

    static getCPs = () => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCPs
            },
            []
        );
    };

    static getPricingRuleGroups = () => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getPricingRuleGroups
            },
            []
        );
    };

    static getCPAOAs = () => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCPAOAs
            },
            []
        );
    };

    static getCPAs = () => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCPAs
            },
            []
        );
    };

    static getCommercialProduct = (id) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCommercialProduct,
            },
            [id]
        );
    };

    static getCommercialProductAssociation = (id) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCommercialProductAssociation,
            },
            [id]
        );
    };

    static getCommercialProductPromotions = (id) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCommercialProductPromotions,
            },
            [id]
        );
    };

    static getAddOnPromotions = (id) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getAddOnPromotions,
            },
            [id]
        );
    };

    static getAddOn = (id) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getAddOn,
            },
            [id]
        );
    };

    static getCPAOAssociation = (id) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.getCPAOAssociation,
            },
            [id]
        );
    };

    static updateRecurringPricing = (id, recurringCharge) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.updateRecurringPricing,
            },
            [id, recurringCharge]
        );
    };
    static updateOneOffPricing = (id, oneOffCharge) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.updateOneOffPricing,
            },
            [id, oneOffCharge]
        );
    };

    static updateRecurringPackageMemberPricing = (id, recurringCharge) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.updateRecurringPackageMemberPricing,
            },
            [id, recurringCharge]
        );
    };
    static updateOneOffPackageMemberPricing = (id, oneOffCharge) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.updateOneOffPackageMemberPricing,
            },
            [id, oneOffCharge]
        );
    };

    static updateAddOnRecurringPricing = (id, recurringCharge) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.updateAddOnRecurringPricing,
            },
            [id, recurringCharge]
        );
    };

    static updateAddOnOneOffPricing = (id, oneOffCharge) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.updateAddOnOneOffPricing,
            },
            [id, oneOffCharge]
        );
    };

    static createNewPromotion = (prgId, prId, cpId, amount, type, adjustmentType, associationType, activeProduct) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.createNewPromotion,
            },
            [prgId, prId, cpId, amount, type, adjustmentType, associationType, activeProduct]
        );
    };

    static createNewPRG = (prgName, prgCode, prgPriority, prDescription) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.PPDM.actions.createNewPRG,
            },
            [prgName, prgCode, prgPriority, prDescription]
        );
    };
}
