import { ConfiguredDocumentClass } from '../../../types/helperTypes';
import { DocumentDataType, DocumentModificationOptions } from '../../common/abstract/document.mjs';

declare global {
  /**
   * The client-side User document which extends the common BaseUser model.
   * Each User document contains UserData which defines its data schema.
   *
   * @see {@link data.UserData}               The User data schema
   * @see {@link documents.Users}             The world-level collection of User documents
   * @see {@link applications.UserConfig}     The User configuration application
   */
  class User extends ClientDocumentMixin(foundry.documents.BaseUser) {
    /**
     * @param data - Initial data provided to construct the User document
     *               (default: `{}`)
     */
    constructor(
      data?: ConstructorParameters<ConstructorOf<foundry.documents.BaseUser>>[0],
      context?: ConstructorParameters<ConstructorOf<foundry.documents.BaseUser>>[1]
    );

    /**
     * Track whether the user is currently active in the game
     * @defaultValue `false`
     */
    active: boolean;

    /**
     * Track references to the current set of Tokens which are targeted by the User
     */
    targets: UserTargets;

    /**
     * Track the ID of the Scene that is currently being viewed by the User
     * @defaultValue `null`
     */
    viewedScene: string | null;

    /**
     * Return the User avatar icon or the controlled actor's image
     */
    get avatar(): string;

    // TODO: Replace return type with ReturnType<Game['actors']['get']> once this is possible
    /**
     * Return the Actor instance of the user's impersonated character (or undefined)
     */
    get character(): InstanceType<ConfiguredDocumentClass<typeof Actor>> | undefined;

    /**
     * A convenience shortcut for the permissions object of the current User
     */
    get permissions(): foundry.data.UserData['permissions'];

    /**
     * A flag for whether the current User is a Trusted Player
     */
    get isTrusted(): boolean;

    /**
     * A flag for whether this User is the connected client
     */
    get isSelf(): boolean;

    /**
     * Assign a Macro to a numbered hotbar slot between 1 and 50
     * @param macro    - The Macro entity to assign
     * @param slot     - A specific numbered hotbar slot to fill
     * @param fromSlot - An optional origin slot from which the Macro is being shifted
     * @returns A Promise which resolves once the User update is complete
     */
    assignHotbarMacro(
      macro: InstanceType<ConfiguredDocumentClass<typeof Macro>> | null,
      slot: string | number,
      { fromSlot }?: { fromSlot: number }
    ): Promise<this>;

    /**
     * Assign a specific boolean permission to this user.
     * Modifies the user permissions to grant or restrict access to a feature.
     *
     * @param permission - The permission name from USER_PERMISSIONS
     * @param allowed    - Whether to allow or restrict the permission
     */
    assignPermission(permission: keyof typeof CONST.USER_PERMISSIONS, allowed: boolean): Promise<this>;

    /**
     * Submit User activity data to the server for broadcast to other players.
     * This type of data is transient, persisting only for the duration of the session and not saved to any database.
     *
     * @param activityData - An object of User activity data to submit to the server for broadcast.
     *                       (default: `{}`)
     */
    broadcastActivity(activityData?: User.ActivityData): void;

    /**
     * Get an Array of Macro Entities on this User's Hotbar by page
     * @param page - The hotbar page number
     *               (default: `1`)
     */
    getHotbarMacros(
      page?: number
    ): Array<{ slot: number; macro: InstanceType<ConfiguredDocumentClass<typeof Macro>> | null }>;

    /**
     * Update the set of Token targets for the user given an array of provided Token ids.
     * @param targetIds - An array of Token ids which represents the new target set
     *                    (default: `[]`)
     */
    updateTokenTargets(targetIds?: string[]): void;

    /** @override  */
    _onUpdate(
      data: DeepPartial<DocumentDataType<foundry.documents.BaseUser>>,
      options: DocumentModificationOptions,
      userId: string
    ): void;

    /** @override  */
    _onDelete(options: DocumentModificationOptions, userId: string): void;

    /**
     * @deprecated since 0.8.0
     */
    isRole(role: Parameters<User['hasRole']>[0]): boolean;

    /**
     * @deprecated since 0.8.0
     */
    setPermission(permission: keyof typeof CONST.USER_PERMISSIONS, allowed: boolean): Promise<this>;
  }

  namespace User {
    interface ActivityData {
      /**
       * The coordinates of the user's cursor
       */
      cursor?: boolean;

      /**
       * Is the user pulling focus to the cursor coordinates?
       */
      focus?: boolean;

      /**
       * Is the user emitting a ping at the cursor coordinates?
       */
      ping?: boolean;

      /**
       * Serialized Ruler coordinate data in JSON format
       */
      ruler?: string;

      /**
       * The id of the Scene currently being viewed by the User
       */
      sceneId?: string;

      /**
       * An array of Token ids which are targeted by the User
       */
      targets?: string[];
    }
  }
}

export {};
