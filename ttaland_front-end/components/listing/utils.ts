import { ShowProperty } from "@/types/api/showProperties";

export const filter_with_price = (condition: string[], properties: ShowProperty[]) => {
  if (condition.length > 0) {
    const ans: ShowProperty[] = []
    for (let i = 0; i < condition.length; i++) {
      const conditionElement = condition[i];
      if (conditionElement.includes('<')) {
        const conditionVal = parseInt(conditionElement.replace(/\D/g, ''))
        for (let j = 0; j < properties.length; j++) {
          const propertiesElement = properties[j];
          if (parseInt(propertiesElement.price) < conditionVal) {
            ans.push(propertiesElement)
          }
        }
      } else if (conditionElement.includes('>')) {
        const conditionVal = parseInt(conditionElement.replace(/\D/g, ''))
        for (let j = 0; j < properties.length; j++) {
          const propertiesElement = properties[j];
          if (parseInt(propertiesElement.price) > conditionVal) {
            ans.push(propertiesElement)
          }
        }
      } else {
        const minConditionVal = parseInt(conditionElement.split(' - ')[0])
        const maxConditionVal = parseInt(conditionElement.split(' - ')[1])
        for (let j = 0; j < properties.length; j++) {
          const propertiesElement = properties[j];
          if (parseInt(propertiesElement.price) > minConditionVal && parseInt(propertiesElement.price) < maxConditionVal) {
            ans.push(propertiesElement)
          }
        }
      }
    }
    return ans
  }
  return properties
}

export const filter_with_area = (condition: string[], properties: ShowProperty[]) => {
  if (condition.length > 0) {
    const ans: ShowProperty[] = []
    for (let i = 0; i < condition.length; i++) {
      const conditionElement = condition[i];
      if (conditionElement.includes('<')) {
        const conditionVal = parseInt(conditionElement.replace(/\D/g, ''))
        for (let j = 0; j < properties.length; j++) {
          const propertiesElement = properties[j];
          if (parseInt(propertiesElement.area) < conditionVal) {
            ans.push(propertiesElement)
          }
        }
      } else if (conditionElement.includes('>')) {
        const conditionVal = parseInt(conditionElement.replace(/\D/g, ''))
        for (let j = 0; j < properties.length; j++) {
          const propertiesElement = properties[j];
          if (parseInt(propertiesElement.area) > conditionVal) {
            ans.push(propertiesElement)
          }
        }
      } else {
        const minConditionVal = parseInt(conditionElement.split(' - ')[0])
        const maxConditionVal = parseInt(conditionElement.split(' - ')[1].replace(/\D/g, ''))
        for (let j = 0; j < properties.length; j++) {
          const propertiesElement = properties[j];
          if (parseInt(propertiesElement.area) > minConditionVal && parseInt(propertiesElement.area) < maxConditionVal) {
            ans.push(propertiesElement)
          }
        }
      }
    }
    return ans
  }
  return properties
}

export const filter_with_location = (condition: string[], properties: ShowProperty[]) => {
  if (condition.length > 0) {
    const ans: ShowProperty[] = []
    for (let i = 0; i < condition.length; i++) {
      const conditionElement = condition[i];
      for (let j = 0; j < properties.length; j++) {
        const propertiesElement = properties[j];
        if (propertiesElement.location.split(',').slice(-2)[0].toUpperCase() === conditionElement) {
          ans.push(propertiesElement)
        }
      }
    }
    return ans
  }
  return properties
}