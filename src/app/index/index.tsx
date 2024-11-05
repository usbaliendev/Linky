import {
    Alert,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Linking,
    Modal
} from 'react-native';
import * as DialogPrimitive from '@rn-primitives/dialog';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { categories } from '@/utils/categories';

import { Categories } from '@/components/categories';
import { Link } from '@/components/link';
import { LinkStorage, linkStorage } from '@/storage/link-storage';
import { Option } from '@/components/option';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

import { colors } from '@/styles/colors';
import { styles } from './styles';
import CategoriesTopTabs from '@/components/ui/categoriestabs';

export default function Index() {
    const [category, setCategory] = useState(categories[0].name);
    const [link, setLink] = useState<LinkStorage>({} as LinkStorage);
    const [links, setLinks] = useState<LinkStorage[]>([]);
    const [showModal, setShowModal] = useState(false);

    async function getLinks() {
        try {
            const response = await linkStorage.getLinks();
            const filtered = response.filter(
                (link) => link.category === category
            );
            setLinks(filtered);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível listar os links');
        }
    }

    function handleDetails(selected: LinkStorage) {
        setShowModal(true);
        setLink(selected);
    }

    async function linkRemove() {
        try {
            await linkStorage.removeLink(link.id);
            getLinks();
            setShowModal(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o link');
            console.log(error);
        }
    }

    async function handleRemove() {
        Alert.alert(
            'Excluir',
            `Tem certeza que deseja excluir o link ${link.name}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                { text: 'Excluir', onPress: () => linkRemove() }
            ]
        );
    }

    async function handleOpen() {
        try {
            await Linking.openURL(link.url);
            setShowModal(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível abrir o link');
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getLinks();
        }, [category])
    );

    return (
        <View className="flex-1 pt-10">
            {/* Viewing Area */}
            <View className="flex-[0.4] justify-center items-center">
                <Image
                    source={require('@/assets/logo.png')}
                    className="h-24 w-28"
                />
            </View>

            {/* Interaction Area */}
            <View className="flex-[0.6] justify-end p-4">
                <AlertDialog>
                    <FlatList
                        data={links}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <AlertDialogTrigger>
                                <Link
                                    name={item.name}
                                    url={item.url}
                                    onDetails={() => handleDetails(item)}
                                />
                            </AlertDialogTrigger>
                        )}
                        className="border-t border-gray-600"
                        contentContainerStyle={{
                            paddingVertical: 24, // p-6 -> padding 24px
                            paddingBottom: 100, // pb-24 -> paddingBottom 100px
                            gap: 20 // gap-5 -> gap between items
                        }}
                        showsVerticalScrollIndicator={true}
                    />

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{link.category}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {link.name}
                                {link.url}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                <Text>Excluir</Text>
                            </AlertDialogCancel>
                            <AlertDialogAction>
                                <Text>Abrir</Text>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Categories onChange={setCategory} selected={category} />

                <View className="absolute bottom-20 right-5 w-16 h-16 rounded-full bg-green-900 flex items-center justify-center">
                    <TouchableOpacity
                        className="  items-center justify-center"
                        onPress={() => router.navigate('/add')}
                    >
                        <MaterialIcons
                            name="add"
                            size={40}
                            color={colors.green[300]}
                        />
                    </TouchableOpacity>
                </View>

                <Modal transparent visible={showModal} animationType="slide">
                    <View className="flex-1 justify-end">
                        <View className="bg-gray-800 border-t border-gray-800 pb-8 p-6">
                            <View className="w-full flex-row items-center mb-8">
                                <Text className="flex-1 text-base font-medium text-gray-400">
                                    {link.category}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowModal(false)}
                                >
                                    <MaterialIcons
                                        name="close"
                                        size={20}
                                        color={colors.gray[400]}
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text className="text-lg font-semibold text-gray-200">
                                {link.name}
                            </Text>
                            <Text className="text-sm text-gray-400">
                                {link.url}
                            </Text>

                            <View className="flex-row mt-6 w-full justify-between border-t border-gray-600 pt-6">
                                <Option
                                    name="Excluir"
                                    icon="delete"
                                    variant="secondary"
                                    onPress={handleRemove}
                                />
                                <Option
                                    name="Abrir"
                                    icon="language"
                                    onPress={handleOpen}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
