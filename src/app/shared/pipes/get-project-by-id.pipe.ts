import {Pipe, PipeTransform} from '@angular/core';


/**
 * This Method accept entity id and returns entity.
 */
@Pipe({ name: 'getProjectById', pure : false })
export class GetProjectByIdPipe implements PipeTransform {
  transform(projectList: any[],ProjectId) {

    return projectList.filter(project=>project.id ==ProjectId);
  }
}
