import { Moment } from 'moment';
import * as moment from 'moment';

import { Serializable } from '../../shared/model/serialization/serializable.model';
import { Location } from './location.model';

export class Plant implements Serializable<Plant> {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public updatedDate?: Moment,
    public version?: number,

    public genus?: string,
    public species?: string,
    public commonName?: string,

    public location?: Location) { }

  /**
   * For a given JSON data object, this method
   * will populate the corresponding AppRegistration object, with
   * the provided properties.
   *
   * @param input JSON input data
   */
  public deserialize(input) {
    this.id = input.id;
    this.genus = input.genus;
    this.species = input.species;
    this.commonName = input.commonName;
    this.createdDate = moment(input.createdDate);
    this.updatedDate = moment(input.updatedDate);
    this.version = input.version;
    this.location = new Location(input.location.latitude, input.location.longitude);
    return this;
  }
}
