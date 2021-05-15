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

            CS.JILE.vfRemotingManager.invokeAction.apply(
                CS.JILE.vfRemotingManager,
                actionArguments
            );
        });
    }

    static getAccount = (accountName) => {
        return VFRemotingService.invokeRemoteAction(
            {
                options: { escape: false, buffer: false },
                remoteActionName: CS.JILE.actions.getAccount
            },
            [accountName]
        );
    };
}
