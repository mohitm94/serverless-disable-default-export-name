const ref = {};

class AWSExportNames {
    constructor(serverless, options) {
        ref.self = this;
        this.serverless = serverless;
        this.service = serverless.service;
        this.hooks = {
            'before:deploy:deploy': this.disableDefaultOutputExportNames.bind(this)
        };
    }

    disableDefaultOutputExportNames() {
        const service = this.serverless.service;
        for (const [key, data] of Object.entries(service.provider.compiledCloudFormationTemplate.Outputs)) {
            if (data.Export !== undefined) {
                delete service.provider.compiledCloudFormationTemplate.Outputs[key].Export;
            }
        }
    }
}

module.exports = AWSExportNames;
