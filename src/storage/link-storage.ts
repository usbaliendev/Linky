/**
  chave: valor
  name: "Rodrigo"
  
  links: [{ name: "Rocket", url: "https://rocketseat.com.br"}, {}, {}, {}]
  a chave contera uma chave com um array de objetos links que serao convertidos em JSON
  e depois desconvertidos para objetos atraves do stringify e parse
 */

// informando a tipo do retorno da funcao como Array<LinkStorage>

import AsyncStorage from "@react-native-async-storage/async-storage"

const LINKS_STORAGE_KEY = "links-storage"

export type LinkStorage = {
  id: string
  name: string
  url: string
  category: string
}
async function getLinks(): Promise<LinkStorage[]> {
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
  const response = storage ? JSON.parse(storage) : []
  return response
}
async function saveLinks(newLink: LinkStorage) {
  try {
    const storage = await getLinks()
    const updated = JSON.stringify([...storage, newLink])
    
    await AsyncStorage.setItem(LINKS_STORAGE_KEY, updated)
  } catch (error) {
    throw error
  }
}

async function removeLink(id: string) {
  try {
    const storage = await getLinks()
    const linksFiltered = JSON.stringify(storage.filter((link) => link.id !== id))
    await AsyncStorage.setItem(LINKS_STORAGE_KEY, linksFiltered)
  } catch (error) {
    throw error
  }
}

export const linkStorage = { getLinks, saveLinks, removeLink }