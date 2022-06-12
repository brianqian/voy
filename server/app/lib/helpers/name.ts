interface Name {
  firstName: string;
  lastName: string;
  middleName: string;
  suffix: string;
}

export const parseName = (name: string): Name => {
  const parts = name.split(' ');

  if (parts.length === 1) {
    const [firstName] = parts;
    return { firstName, lastName: '', middleName: '', suffix: '' };
  }

  if (parts.length === 2) {
    const [firstName, lastName] = parts;
    return { firstName, lastName, middleName: '', suffix: '' };
  }

  const suffixes = ['jr.', 'sr.', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

  if (parts.length === 3) {
    const [firstName, middleName, lastName] = parts;

    if (middleName.toLocaleLowerCase() === 'de') {
      return { firstName, lastName: `${middleName}${lastName}`, middleName: '', suffix: '' };
    }
    if (suffixes.includes(lastName.toLocaleLowerCase())) {
      return { firstName, lastName: middleName, middleName: '', suffix: lastName };
    }

    return { firstName, middleName, lastName, suffix: '' };
  }

  if (parts.length === 4) {
    const [firstName, middleName, lastName, suffix] = parts;
    if (middleName.toLocaleLowerCase() === 'de') {
      return { firstName, lastName: `${middleName}${lastName}`, middleName: '', suffix: lastName };
    }
    return { firstName, lastName, middleName, suffix };
  }

  throw new Error(`Unable to parse name: ${name}`);
};
