import { MaterialIcons } from '@expo/vector-icons'

type Category = {
  id: string
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
}

export const categories : Category[] = [ 
  { id: "1", name: "Link", icon: "link" },
  { id: "2", name: "Video", icon: "movie" },
  { id: "3", name: "ShoppinLink" , icon: "shopping-cart"},
  { id: "4", name: "Read", icon: "bookmark" },
  { id: "5", name: "Cook" , icon: "kitchen"},
  { id: "6", name: "DIY", icon: "handyman" },
  { id: "7", name: "Curso", icon: "code-off" },
]