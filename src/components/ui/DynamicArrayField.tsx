import React, { CSSProperties, SVGAttributes } from 'react';
//import { IconContext } from 'react-icons';
//import loadable from "@loadable/component";

import { FiSettings, FiType } from 'react-icons/fi';

import { WiCloud } from 'react-icons/wi';

import { SiGoogleclassroom, SiOpslevel, SiFuturelearn } from 'react-icons/si';

import { GiReceiveMoney, GiProtectionGlasses, GiTeacher } from 'react-icons/gi';


//import ArrayFieldRegistrationSheet from 'features/production/arrayField/ArrayFieldRegistrationSheet';
import { IField } from './ArrayField';


interface IProps {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
}

//export default function ArrayFieldRegistrationSheet<T extends IField> (params: T[])  {

export function arrayFieldFromName<T extends IField>(actionName: string, params: T[] ) : React.ReactNode {

  switch(actionName) {

    //case 'CreateRegistrationSheet': return <ArrayFieldRegistrationSheet params={params} />
    

    default: return <WiCloud />;
  }


}

//export default DynamicIcon;