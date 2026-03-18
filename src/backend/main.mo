import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    null;
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    null;
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () { () };
};
