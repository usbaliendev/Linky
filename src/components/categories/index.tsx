import { FlatList } from 'react-native';

import { categories } from '@/utils/categories';
import { Category } from '@/components/category';

type CategoriesProps = {
    selected: string;
    onChange: (category: string) => void;
};
export function Categories({ selected, onChange }: CategoriesProps) {
    return (
        <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Category
                    name={item.name}
                    icon={item.icon}
                    isSelected={item.name === selected}
                    onPress={() => onChange(item.name)}
                />
            )}
            horizontal
            className="h-14 max-h-14"
            contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 12
            }}
        />
    );
}
