import { Column, Entity, OneToMany } from "typeorm";
import { Comment } from "./comment";
import { IdEntity } from "./common";
import { Feed } from "./feed";
import { Role, UserInClub } from "./userInClub";

export interface UserScheme extends IdEntity {
  password: string;
  social_id: string;
  name: string;
  sex: boolean;
  phone: string;
  email: string;
}

export type UserDto = Omit<UserScheme, "password">;

export type UserInClubDto = UserDto & {
  role: Role;
  exp: number;
};

export type UserWithClubsDto = UserDto & { clubs: UserInClub[] };

export type UserCreate = Omit<UserScheme, keyof IdEntity>;

export type UserUpdate = UserCreate;

@Entity("users")
export class User extends IdEntity implements UserScheme {
  @Column()
  password: string;

  @Column({ unique: true })
  social_id: string;

  @Column()
  name: string;

  @Column()
  sex: boolean;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UserInClub, (userInClub) => userInClub.user, {
    cascade: true,
  })
  public clubs: UserInClub[];

  @OneToMany(() => Feed, (feed) => feed.user, {
    cascade: true,
  })
  public feeds: Feed[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  public comments: Comment[];

  @Column({
    enum: Role,
    select: false,
    insert: false,
    readonly: true,
    nullable: true,
  })
  public role: Role;

  @Column({ select: false, insert: false, readonly: true, nullable: true })
  public exp: number;
}

export class UserConverter {
  public static toDto = (user: User): UserDto => {
    const { password, ...dto } = user;
    return dto;
  };

  public static toInClubDto = (user: User): UserInClubDto => {
    const { password, clubs, ...dto } = user;
    return { ...dto };
  };

  public static toDtoWithClubs = (user: User): UserWithClubsDto => {
    const { password, ...dto } = user;
    return dto;
  };

  public static fromCreate = (dto: UserCreate): User => {
    const user = new User();
    return Object.assign(user, dto);
  };

  public static fromUpdate = (id: number, dto: UserUpdate): User => {
    const user = new User();
    return Object.assign(user, { id, ...dto });
  };
}
