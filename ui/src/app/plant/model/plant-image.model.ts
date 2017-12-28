import { Moment } from 'moment';
import * as moment from 'moment';

import { Serializable } from '../../shared/model/serialization/serializable.model';

export class PlantImage implements Serializable<PlantImage> {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public updatedDate?: Moment,
    public version?: number,
    public name?: string,
    public image?: string
  ) { }

  /**
   * For a given JSON data object, this method
   * will populate the corresponding AppRegistration object, with
   * the provided properties.
   *
   * @param input JSON input data
   */
  public deserialize(input) {
    this.id = input.id;
    this.name = input.name;
    this.image = input.image;
    this.createdDate = moment(input.createdDate);
    this.updatedDate = moment(input.updatedDate);
    this.version = input.version;
    return this;
  }
}
