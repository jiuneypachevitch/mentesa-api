import { Patient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { CreatePatientDto } from '@/dtos/patient.dto';
import { hash } from 'bcrypt';
import client from '@/prisma/client';

class PatientService {
  public patient = client.patient;

  public async findAllPatients(professionalId: number): Promise<Patient[]> {
    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const allPatients: Patient[] = await this.patient.findMany({
      where: { professionalId },
    });

    return allPatients;
  }

  public async findPatientById(patientId: number): Promise<Patient> {
    if (isEmpty(patientId))
      throw new HttpException(400, 'Id do paciente não foi informado');

    const findPatient: Patient = await this.patient.findUnique({
      where: { id: patientId },
    });

    if (!findPatient) throw new HttpException(409, 'Paciente inexistente');

    return findPatient;
  }

  public async create(
    patientData: CreatePatientDto,
    professionalId: number
  ): Promise<Patient> {
    if (isEmpty(patientData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findPatient = await this.patient.findMany({
      where: {
        OR: [{ cpf: patientData.cpf }, { email: patientData.email }],
      },
    });

    if (findPatient.length > 0)
      throw new HttpException(409, `O paciente já está cadastrado`);

    const hashedPassword = await hash('12345678', 8);
    const createPatientlData: Promise<Patient> = this.patient.create({
      data: {
        name: patientData.name,
        cpf: patientData.cpf,
        gender: patientData.gender,
        cellphone: patientData.cellphone,
        birthDate: new Date(patientData.birthDate),
        Professional: {
          connect: {
            id: professionalId,
          },
        },
        User: {
          create: {
            email: patientData.email,
            password: hashedPassword,
            role: 'USER',
          },
        },
      },
    });

    return createPatientlData;
  }

  public async updatePatient(
    patientId: number,
    patientData: CreatePatientDto
  ): Promise<Patient> {
    if (isEmpty(patientData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    const findPatient: Patient = await this.patient.findUnique({
      where: { id: patientId },
    });

    if (!findPatient) throw new HttpException(409, 'Paciente inexistente');

    const patientExistent = await this.patient.findMany({
      where: {
        OR: [{ cpf: patientData.cpf }, { email: patientData.email }],
        NOT: {
          id: findPatient.id,
        },
      },
    });

    if (patientExistent.length > 0)
      throw new HttpException(409, `O paciente já está cadastrado`);

    const updatePatient = await this.patient.update({
      where: { id: patientId },
      data: {
        name: patientData.name,
        cpf: patientData.cpf,
        gender: patientData.gender,
        cellphone: patientData.cellphone,
        birthDate: new Date(patientData.birthDate),
        User: {
          update: {
            email: patientData.email,
          },
        },
      },
    });

    return updatePatient;
  }

  public async deletePatient(patientId: number): Promise<Patient> {
    if (isEmpty(patientId))
      throw new HttpException(400, 'Id do paciente não foi informado');

    const findPatient: Patient = await this.patient.findUnique({
      where: { id: patientId },
    });

    if (!findPatient) throw new HttpException(409, 'Paciente inexistente');

    const deletePatientData = await this.patient.delete({
      where: { id: patientId },
    });

    return deletePatientData;
  }
}

export { PatientService };
