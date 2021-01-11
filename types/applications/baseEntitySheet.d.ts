/**
 * Extend the FormApplication pattern to incorporate specific logic for viewing
 * or editing Entity instances.
 * See the FormApplication documentation for more complete description of this
 * interface.
 * @typeParam T - the type of the data used to render the inner template
 * @typeParam D - the type of the data in the Entity
 * @typeParam O - the type of the Entity which should be managed by this form
 *                sheet
 * @typeParam F - the type of the of validated form data with which to update
 *                the Entity
 */
declare class BaseEntitySheet <
  T = object,
  D = object,
  O extends Entity<D> = Entity<D>,
  F = object
> extends FormApplication<T, O> {
  /**
   * @param object - An Entity which should be managed by this form sheet.
   * @param options - Optional configuration parameters for how the form
   *                  behaves.
   */
  constructor (object: O, options: BaseEntitySheet.Options)

  /**
   * @override
   */
  static get defaultOptions (): BaseEntitySheet.Options

  /**
   * A convenience accessor for the object property, which in the case of a
   * BaseEntitySheet is an Entity instance.
   */
  get entity (): O

  /**
   * @override
   */
  get isEditable (): boolean

  /**
   * @override
   */
  get title (): string

  /**
   * @override
   */
  _getHeaderButtons (): Application.HeaderButton[]

  /**
   * @param event - (unused)
   * @override
   */
  _updateObject (
    event: Event,
    formData: object
  ): Promise<O>

  /**
   * Default data preparation logic for the entity sheet
   * @param options - (unused)
   * @override
   */
  getData (options?: any): BaseEntitySheet.Data<D, O>

  /**
   * @override
   */
  render (force: boolean, options: Application.RenderOptions): this
}

declare namespace BaseEntitySheet {
  /**
   * @typeParam D - the type of the data in the Entity
   * @typeParam O - the type of the Entity which should be managed by this form
   *                sheet
   */
  interface Data<D, O> extends FormApplication.Data<O> {
    cssClass: string
    editable: boolean
    entity: EntityData<D>
    limited: boolean

    /**
     * @remarks This property is not populated and only exists to make the
     *          typescript compile.
     */
    object: O

    options: any
    owner: boolean
    title: string
  }

  interface Options extends FormApplication.Options {
    /**
     * @defaultValue `['sheet']`
     */
    classes: string[]

    /**
     * @defaultValue
     * ```javascript
     * `templates/sheets/${this.name.toLowerCase()}.html`
     * ```
     */
    template: string

    /**
     * @defaultValue {@link ConstTypes.EntityPermissions.Limited}
     */
    viewPermission: ConstTypes.EntityPermissions
  }
}