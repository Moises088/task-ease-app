import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { View, TextInput } from 'react-native';
import { TaskItemProps } from '../../../interfaces/screens/task.interface';
import { BUTTON_PRIMARY, TEXT_PRIMARY } from '../../../constants/colors.constant';
import { defaultList } from '../../../constants/task.constant';

const TaskItens: React.FC<TaskItemProps> = ({ index, item, itens, setItens, textInputRefs }) => {
    return (
        <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <BouncyCheckbox
                isChecked={item.check}
                text=""
                disableBuiltInState
                onPress={() => {
                    const updatedItens = [...itens];
                    updatedItens[index].check = !item.check;
                    setItens(updatedItens);
                }}
                fillColor={BUTTON_PRIMARY}
            />

            <TextInput
                ref={(ref) => {
                    textInputRefs.current[index] = ref;
                }}
                placeholder='Escreva sua tarefa'
                value={item.title}
                placeholderTextColor='#969696'
                style={{ color: TEXT_PRIMARY, width: "100%" }}
                onChangeText={(text) => {
                    const updatedItens = [...itens];  // Crie uma cópia do array de itens
                    updatedItens[index] = { ...updatedItens[index], title: text };  // Atualize apenas o item atual
                    setItens(updatedItens);
                }}
                onSubmitEditing={() => {
                    const itensMap = itens.map(i => i);
                    if (!item?.title?.length) return

                    if ((itens.length - 1) == index) {
                        itensMap.push(defaultList)
                        setItens(itensMap)
                    } else {
                        itensMap.splice(index + 1, 0, defaultList);
                        setItens(itensMap);
                    }

                    setTimeout(() => {
                        if (textInputRefs.current[index + 1]) {
                            textInputRefs.current[index + 1]?.focus();
                        }
                    }, 10);
                }}
            />
        </View>
    );
}

export default TaskItens;