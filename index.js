const ref = {}

class AWSExportNames {
    constructor(serverless, options) {
        ref.self = this;
        this.serverless = serverless;
        this.service = serverless.service;
        this.hooks = {
            'before:package:finalize': this.disableDefaultOutputExportNames.bind(this)
        }

    }

    disableDefaultOutputExportNames() {
        const cfnTemplate = this.serverless.service.provider.compiledCloudFormationTemplate;

        for (const [key, data] of Object.entries(cfnTemplate.Outputs)) {
            if (data.Export !== undefined) {
                delete data.Export;
            }
        }
    }
}

module.exports = DisableOutputs
