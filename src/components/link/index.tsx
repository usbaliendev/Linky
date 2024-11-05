import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { styles } from './styles';
import { colors } from '@/styles/colors';

type LinkProps = {
    name: string;
    url: string;
    onDetails: () => void;
};

export function Link({ name, url, onDetails }: LinkProps) {
    return (
        <Card className="w-full max-w-sm flex flex-col">
            <CardHeader>
                <CardTitle className="text-white">{name}</CardTitle>
                <CardDescription className="text-white">{url}</CardDescription>
            </CardHeader>
            <TouchableOpacity onPress={onDetails}>
                <MaterialIcons
                    name="more-horiz"
                    size={20}
                    color={colors.gray[400]}
                />
            </TouchableOpacity>

            {/* <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.url} numberOfLines={1}>
                    {url}
                </Text>
            </View> */}
        </Card>
    );
}
