const validator = (data, rules, options = { firstOnly: false }) => {
    let fields = Object.keys(rules);
    let errors = {};
    fields.forEach(field => {
        let value = data[field];
        let constraint = rules[field];

        let allRules = Array.isArray(constraint) ? constraint : [constraint];

        allRules.forEach(rule => {
            let validate = undefined;
            let message = undefined;

            if (typeof rule === "function") {
                validate = rule;
            } else if (rule && typeof rule.rule === "function") {
                validate = rule.rule;
                message = rule.message;
            }

            if (validate === undefined) {
                throw new Error("rule not found");
            }

            if (!validate(value)) {
                if (errors[field] === null || errors[field] === undefined) {
                    errors[field] = [];
                }
                errors[field] = errors[field].concat(
                    genErrorMessage(field, message)
                );
            }
        });
    });

    if (options.firstOnly) {
        Object.keys(errors).forEach(key => {
            errors[key] = errors[key].slice(1);
        });
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

const genErrorMessage = (key, message = "is invalid") => {
    let keyToSentenceCase = key.replace(
        /^[a-z]|[A-Z]/g,
        (v, i) => (i === 0 ? v.toUpperCase() : " " + v.toLowerCase())
    );
    return `${keyToSentenceCase} ${message}`;
};

export default validator;
