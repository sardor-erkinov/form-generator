import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

interface ITodoOnePageProps {
  id: string;
}

const genders = ['Male', 'Female']

const fields: TypedField[] = [
  {
    type: FieldType.Div,
    style: {
      display: "flex",
      gap: 10,
      alignItems: 'flex-start'
    },
    fields: [
      {
        type: FieldType.Div,
        style: {
          display: "flex",
          flexDirection: "column",
        },
        fields: [
          {
            type: FieldType.Div,
            style: {
              width: "200px",
              height: "200px",
              display: 'block',
              background: 'gray'
            },
          },
          {
            type: FieldType.Rating,
            readonly: true,
            compute() {
              return 3
            }
            // sx: { display: 'inline' }
          },
        ]
      },
      {
        type: FieldType.Div,
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%"
        },
        fields: [
          {
            type: FieldType.Line,
            title: "Профиль",
            name: 'ds'
          },
          {
            type: FieldType.Items,
            title: "Пол",
            itemList: genders,
            defaultValue: genders[1],
          },
          {
            type: FieldType.Items,
            title: "Списки",
            itemList: [],
          },
          {
            type: FieldType.Div,
            style: {
              display: "flex",
              gap: "10px",
              width: "100%",
            },
            fields: [
              {
                type: FieldType.Text,
                title: "Кодовая фраза",
                disabled: true,
                outlined: false,
                name: 'keyword',
              },
              {
                type: FieldType.Checkbox,
                title: "Кодовая фраза",
              },
            ]
          },
        ]
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "Общая информация",
  },

  {
    type: FieldType.Text,
    name: "firstName",
    title: "Имя",
    description: 'Description',
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Фамилия",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Возраст",
  },
  {
    type: FieldType.Expansion,
    title: 'Подписка',
    description: 'Подписка на уведомления',
    fields: [
      {
        type: FieldType.Switch,
        title: 'Подписка',
        name: 'subscribed',
        defaultValue: true,
      },
    ]
  },
  {
    type: FieldType.Div,
    style: {
      display: "flex",
      gap: 10
    },
    fields: [
      {
        type: FieldType.Div,
        style: {
          display: "block",
          gap: 10
        },
        fields: [
          {
            type: FieldType.Line,
            title: "Работа",
          },
          {
            type: FieldType.Text,
            name: "jobTitle",
            title: "Должност",
          },
          {
            type: FieldType.Text,
            name: "country",
            title: "Места работы",
          },
        ]
      },
      {
        type: FieldType.Div,
        style: {
          display: "flex",
          flex: 1,
          flexDirection: "column"
        },
        fields: [
          {
            type: FieldType.Line,
            title: "Домашний адрес",
          },
          {
            type: FieldType.Text,
            name: "country",
            title: "Страна",
          },
          {
            type: FieldType.Text,
            name: "city",
            title: "Город",
          },
          {
            type: FieldType.Text,
            name: "state",
            title: "Област",
          },
          {
            type: FieldType.Text,
            name: "address",
            title: "Адрес",
          },
        ]
      },
    ],
  }
];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [
    fetchApi<ITodoItem>(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Список профилей"
          subtitle={'Профиль'}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
