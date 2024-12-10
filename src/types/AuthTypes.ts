export type CustomInputProps = {
    placeholder: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
};
export type SearchBarProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
};

export type FilterButtonProps = {
onPress: () => void;
selected?: string|number;
}

export type SolidButtonProps = {
    text: string;
    onPress: () => void;
};