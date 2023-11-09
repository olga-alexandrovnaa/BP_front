import cls from "./MainPage.module.scss";
import Dendogram from "./Dendogram";
import { Button } from "@/sharedComponents/ui/Button";
import { useCallback, useState } from "react";

export type Node = {
  type: "node";
  value: number;
  nameInfo: string;
  completeInfo: string;
  fieldsInfo: string;
  usersInfo: string;

  id: number;
  processId: number;
  shablonActionId: number;
  completed: boolean;
  closed: boolean;
  level: number;
  setCompleteUserId: number | null;
  children: Data[];
  setCompleteUser: {
    id: number;
    name: string;
  } | null;
  inputFieldValues: {
    id: number;
    completedActionId: number;
    processShablonActionInputFieldId: number;
    value: string;
    processShablonActionInputField: {
      id: number;
      processShablonActionId: number;
      requestInputFieldType: string | null;
      requestParamName: string | null;
      requestId: number | null;
      label: string;
    };
  }[];
  shablonAction: {
    id: number;
    name: string;
    type: string;
    processShablonId: number;
    availableForUsers: {
      id: number;
      name: string;
    }[];
    availableForUserGroups: {
      actionId: number;
      groupId: number;
      group: {
        id: number;
        name: string;
        parentId: number | null;
        allUsers: {
          id: number;
          name: string;
        }[];
      };
    }[];
  };
};

export type Leaf = {
  type: "leaf";
  value: number;
  nameInfo: string;
  completeInfo: string;
  fieldsInfo: string;
  usersInfo: string;

  id: number;
  processId: number;
  shablonActionId: number;
  completed: boolean;
  closed: boolean;
  level: number;
  setCompleteUserId: number | null;
  setCompleteUser: {
    id: number;
    name: string;
  } | null;
  inputFieldValues: {
    id: number;
    completedActionId: number;
    processShablonActionInputFieldId: number;
    value: string;
    processShablonActionInputField: {
      id: number;
      processShablonActionId: number;
      requestInputFieldType: string | null;
      requestParamName: string | null;
      requestId: number | null;
      label: string;
    };
  }[];
  shablonAction: {
    id: number;
    name: string;
    type: string;
    processShablonId: number;
    availableForUsers: {
      id: number;
      name: string;
    }[];
    availableForUserGroups: {
      actionId: number;
      groupId: number;
      group: {
        id: number;
        name: string;
        parentId: number | null;
        allUsers: {
          id: number;
          name: string;
        }[];
      };
    }[];
  };
};

export type Data = Node | Leaf;

function MainPage() {
  const [data, setData] = useState();
  const [processId, setProcessId] = useState(18);

  const loadData = useCallback(async () => {
    const response = await fetch(`http://localhost:5001/api/${processId}`);
    const responseJSON = await response.json();

    const calc = (d: Data) => {
      d.value = d.id;
      const users = [
        ...d.shablonAction.availableForUsers.map((e) => `id:${e.id}_${e.name}`),
      ];
      for (const group of d.shablonAction.availableForUserGroups) {
        if (group.group.allUsers)
          for (const user of group.group.allUsers) {
            if (!users.find((e) => `id:${user.id}_${user.name}` === e)) {
              users.push(`id:${user.id}_${user.name}`);
            }
          }
      }
      d.nameInfo = d.id + ' ' + d.shablonAction.name;
      d.completeInfo = d.completed
        ? `(Выполнил ${d.setCompleteUser.name})`
        : d.closed
        ? "(Выполнено авт.)"
        : "(Активно)";
      d.fieldsInfo = d.inputFieldValues
        .map(
          (e) =>
            `${e.processShablonActionInputField.label}: id: ${e.id} value: ${e.value}`
        )
        .join("; ");
      d.usersInfo = users.join(", ");

      if ("children" in d) {
        d.type = "node";

        for (const i of d.children) {
          calc(i);
        }
        // if (d.closed && d.shablonAction.type === "ACTION") {
        //   delete d["children"];
        // }
      }
      if (!("children" in d)) {
        d.type = "leaf";
      }
    };
    calc(responseJSON);
    setData(responseJSON);
  }, [processId]);

  console.log(data);

  const start = useCallback(() => {
    // const formData = new URLSearchParams();
    // formData.append("email", authData.email);
    // formData.append("password", authData.password);
    // const response = await fetch(__API__ + "login", {
    //   credentials: "include",
    //   method: "POST",
    //   body: formData,
    // });
    // const responseJSON = await response.json();
    // const res = await fetch();
  }, []);

  return (
    <div className={cls.MainPage}>
      <Button onClick={loadData}>Обновить состояния</Button>
      {!!data && <Dendogram data={data} width={2000} height={1000} />}
    </div>
  );
}

export default MainPage;
