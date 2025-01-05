import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserIcon } from '@/lib/interfaces';

const Usericon: React.FC<IUserIcon> = ({ name }) => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
};

export default Usericon;
