import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info'] });

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alice@prisma.io',
    password: '12345678',
    role: 'ADMIN',
    Professional: {
      create: {
        name: 'Alice Costa',
      },
    },
  },
  {
    email: 'nilu@prisma.io',
    password: 'teste5678',
    role: 'ADMIN',
    Professional: {
      create: {
        name: 'Nilu Fereira',
      },
    },
  },
  {
    email: 'mahmoud@prisma.io',
    password: '123teste',
    role: 'ADMIN',
    Professional: {
      create: {
        name: 'Mahmoud Augustu',
      },
    },
  },
];

const professionalData: Prisma.ProfessionalUpdateArgs[] = [
  {
    where: {
      id: 1,
    },
    data: {
      crp: '1233445565',
      cellphone: '(67)99998-0000',
      approach: 'Análise bioenergética',
    },
  },
  {
    where: {
      id: 2,
    },
    data: {
      crp: '4556512334',
      cellphone: '(64)99997-0000',
      approach: 'Behavorismo',
    },
  },
  {
    where: {
      id: 3,
    },
    data: {
      crp: '9999445565',
      cellphone: '(67)99996-0000',
      approach: 'Terapia Cognitivo Comportamental (TCC)',
    },
  },
];

const patientData: Prisma.PatientCreateInput[] = [
  {
    name: 'Juca Bala',
    cpf: '00000000091',
    gender: 'MASCULINE',
    cellphone: '(67)98100-0009',
    birthDate: new Date('1990-01-14'),
    User: {
      create: {
        email: 'juca@prisma.io',
        password: '123teste',
        role: 'USER',
      },
    },
    Professional: {
      connect: {
        id: 1,
      },
    },
  },
  {
    name: 'Lara Crispin',
    cpf: '00000000092',
    gender: 'FEMININE',
    cellphone: '(11)98200-0001',
    birthDate: new Date('1992-06-24'),
    User: {
      create: {
        email: 'lara@prisma.io',
        password: 'lara123',
        role: 'USER',
      },
    },
    Professional: {
      connect: {
        id: 1,
      },
    },
  },
  {
    name: 'Julio Ermiro',
    cpf: '00000000093',
    gender: 'OTHERS',
    cellphone: '(21)98200-0002',
    birthDate: new Date('1989-09-21'),
    User: {
      create: {
        email: 'julio@prisma.io',
        password: '546123',
        role: 'USER',
      },
    },
    Professional: {
      connect: {
        id: 3,
      },
    },
  },
];

const scheduleData: Prisma.ScheduleCreateInput[] = [
  {
    sessionDate: new Date('2020-09-20 09:00:00'),
    scheduleType: 'INDIVIDUAL',
    type: 'ONLINE',
    Professional: {
      connect: {
        id: 1,
      },
    },
    PatientsSchedule: {
      create: {
        patientId: 1,
      },
    },
  },
  {
    sessionDate: new Date('2020-09-25 11:00:00'),
    scheduleType: 'COUPLE',
    type: 'ONLINE',
    Professional: {
      connect: {
        id: 2,
      },
    },
    PatientsSchedule: {
      create: [
        {
          patientId: 1,
        },
        {
          patientId: 2,
        },
      ],
    },
  },
  {
    sessionDate: new Date('2020-09-20 09:00:00'),
    scheduleType: 'IN_GROUP',
    type: 'PRESENTIAL',
    Professional: {
      connect: {
        id: 3,
      },
    },
    PatientsSchedule: {
      create: [
        {
          patientId: 1,
        },
        {
          patientId: 2,
        },
        {
          patientId: 3,
        },
      ],
    },
  },
];

const resourceData: Prisma.ResourceCreateInput[] = [
  { title: 'Depressão', category: 'Transe' },
  { title: 'Ansiedade', category: 'Ferramenta' },
  { title: 'Luto', category: 'Transe' },
];

const sessionData: Prisma.SessionCreateInput[] = [
  {
    subject: 'Depressão Psicótica',
    duration: 30,
    Schedule: {
      connect: {
        id: 1,
      },
    },
    Resource: {
      connect: {
        id: 1,
      },
    },
  },
  {
    subject: 'Luto Familiar',
    duration: 60,
    Schedule: {
      connect: {
        id: 2,
      },
    },
    Resource: {
      connect: {
        id: 3,
      },
    },
  },
];

async function main() {
  for (const user of userData) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const professional of professionalData) {
    await prisma.professional.updateMany({
      where: professional.where,
      data: professional.data,
    });
  }

  for (const patient of patientData) {
    await prisma.patient.create({
      data: patient,
    });
  }

  for (const schedule of scheduleData) {
    await prisma.schedule.create({
      data: schedule,
    });
  }

  for (const resource of resourceData) {
    await prisma.resource.create({
      data: resource,
    });
  }

  for (const session of sessionData) {
    await prisma.session.create({
      data: session,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
