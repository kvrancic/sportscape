import ProfilePage from './ProfilePage';

const Profile = ({ params }) => {
  return <ProfilePage id={params.id} />;
};

export default Profile;
