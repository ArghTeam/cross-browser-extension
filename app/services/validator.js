import is from 'is_js'

const rulePattern = /(\w+)\[(\w+)]?/

const removeEmpty = obj => Object.keys(obj).forEach(key => !obj[key] ? delete obj[key] : '');

const parseRule = rule => {
  const ruleMatch = rule.match(rulePattern)
  return ruleMatch ? { name: ruleMatch[1], value: ruleMatch[2] } : { name: rule }
}

const parseRules = rules => rules.split('|').map(rule => parseRule(rule))

const checkRules = (form, config, rules) => {
  let result = null

  rules.forEach(rule => {
    if (!result) {
      result = rulesHandler[rule.name](form, config, rule)
    }
  })

  return result
}

const rulesHandler = {
  required: (form, config, rule) => {
    const value = form[config.field].value
    return !!value ? null : config.messages[rule.name]
  },
  valid_email: (form, config, rule) => {
    const value = form[config.field].value
    return is.email(value) ? null : config.messages[rule.name]
  },
  match: (form, config, rule) => {
    const value = form[config.field].value
    const matchValue = form[rule.value].value
    return value === matchValue ? null : config.messages[rule.name]
  }
}


export default (formName, configs, onErrors, onValid) => {
  let errors = {}
  const form = document.forms[formName]
  configs.forEach(config => {
    const rules = parseRules(config.rules)
    errors[config.field] = checkRules(form, config, rules)
  })

  removeEmpty(errors)

  return Object.keys(errors).length === 0 ? onValid() : onErrors(errors)

}