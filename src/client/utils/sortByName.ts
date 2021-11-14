import { EntityWithNameType } from '@root/client/types/helpers';

const sortByName = <T extends EntityWithNameType>(data: T[]) => data.sort((a, b) => a.name.localeCompare(b.name));

export default sortByName;
