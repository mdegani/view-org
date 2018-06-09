import "rxjs";
import { Observable } from "rxjs/Observable";
import { combineEpics } from "redux-observable";
import {
  saveFormValueString,
  FormInstance
} from "../forms/actions/from.actions";
import { addOrgNode } from "../org/actions/org.actions";

type RandomNamePayload = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: Date; // date
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

const createTopManager = action$ => {
  return action$.ofType("DELETE_ALL_ORG_NODES").switchMap(() => {
    return Observable.ajax(
      "https://randomuser.me/api/?nat=ca&inc=name,gender,dob,id,login,picture&noinfo"
    )
      .map(data => {
        return data.response.results[0];
      })
      .switchMap((response: RandomNamePayload) => {
        return Observable.from([
          addOrgNode(
            1,
            0,
            response.name.first,
            response.name.last,
            response.gender,
            response.picture.large
          )
        ]);
      })
      .catch(error => {
        return Observable.from([addOrgNode(1, 0, "", "", "", "")]);
      });
  });
};

const setNewEmployeeDefaults = action$ => {
  return action$.ofType("SET_OPEN_NEW_ORG_NODE_FORM").switchMap(() => {
    return Observable.ajax(
      "https://randomuser.me/api/?nat=ca&inc=name,gender,dob,id,login,picture&noinfo"
    )
      .map(data => {
        return data.response.results[0];
      })
      .switchMap((response: RandomNamePayload) => {
        return Observable.from([
          saveFormValueString(
            FormInstance.NewNodeForm,
            "firstName",
            response.name.first
          ),
          saveFormValueString(
            FormInstance.NewNodeForm,
            "lastName",
            response.name.last
          ),
          saveFormValueString(
            FormInstance.NewNodeForm,
            "gender",
            response.gender
          ),
          saveFormValueString(
            FormInstance.NewNodeForm,
            "lastName",
            response.name.last
          ),
          saveFormValueString(
            FormInstance.NewNodeForm,
            "picture",
            response.picture.large
          )
        ]);
      });
  });
};

export const rootEpic = combineEpics(setNewEmployeeDefaults, createTopManager);
