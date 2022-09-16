import { Professional } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { UpdateProfessionalDto } from '@/dtos/professional.dto';
import client from '@/prisma/client';

class ProfessionalService {
  public professional = client.professional;

  public async findProfessionalById(
    professionalId: number
  ): Promise<Professional> {
    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const findProfessional: Professional = await this.professional.findUnique({
      where: { id: professionalId },
    });

    if (!findProfessional)
      throw new HttpException(409, 'Profissional inexistente');

    return findProfessional;
  }

  public async updateProfessional(
    professionalId: number,
    professionalData: UpdateProfessionalDto
  ): Promise<Professional> {
    if (isEmpty(professionalData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    let findProfessional: Professional = await this.professional.findUnique({
      where: { id: professionalId },
    });

    if (!findProfessional)
      throw new HttpException(409, 'Profissional inexistente');

    findProfessional = await this.professional.findFirst({
      where: { id: { not: professionalId }, crp: professionalData.crp },
    });

    if (findProfessional)
      throw new HttpException(
        409,
        `O crp ${professionalData.crp} já está cadastrado`
      );

    const updateProfessional = await this.professional.update({
      where: { id: professionalId },
      data: { ...professionalData },
    });

    return updateProfessional;
  }
}

export { ProfessionalService };