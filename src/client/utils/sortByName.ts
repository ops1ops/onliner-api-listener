import { NameType } from "@root/client/types/helpers";

const sortByName = <T extends NameType>(data: T[]) => data.sort((a, b) => a.name.localeCompare(b.name));

export default sortByName;
