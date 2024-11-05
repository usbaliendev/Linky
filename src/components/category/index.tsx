import { Text, Pressable, PressableProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { styles } from './styles'

type CategoryProps=PressableProps & {
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
  isSelected: boolean
}
export function Category({ name, icon, isSelected, ...rest }: CategoryProps){
  const color = isSelected ? colors.green[300] : colors.gray[400]
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={color}/>
      <Text style={[styles.name, {color}]}>{name}</Text>
    </Pressable>
  )
}