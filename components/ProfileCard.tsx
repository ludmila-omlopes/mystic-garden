import React from 'react';

const ProfileCard = ({ profile }) => {
    if (!profile) {
        return (
            <div className="alert alert-warning" role="alert">
                No profile found. Please ensure the search criteria are correct and try again.
            </div>
        );
    }

    return (
        <div className="card shadow-lg rounded-lg overflow-hidden">
            <a
                href={`https://hey.xyz/u/${profile.handle?.localName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity duration-200"
            >
                {/* Image style adjusted for left alignment while keeping proportions */}
                <img
                    src={profile.metadata?.picture?.__typename === 'ImageSet' ? profile.metadata?.picture?.optimized?.uri : undefined}
                    alt="Profile"
                    style={{ maxWidth: '100%', maxHeight: '240px', height: 'auto', display: 'block' }}
                    className="object-cover"
                />
            </a>
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{profile.metadata?.displayName}</h3>
                <p>Handle: @{profile.handle?.localName}</p>
                <p>Profile Hex Id: {profile.id}</p>
                <p>Profile Id: #{parseInt(profile.id).toString()}</p>
                <div className="mt-4 space-y-2">
                    <a
                        href={`https://polygonscan.com/address/${profile.ownedBy.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                    >
                        Owner Address on PolygonScan
                    </a>
                    <a
                        href={`https://opensea.io/assets/matic/0xdb46d1dc155634fbc732f92e853b10b288ad5a1d/${parseInt(profile.id).toString()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                    >
                        <img src="https://opensea.io/static/images/logos/opensea-logo.svg" alt="OpenSea Logo" className="mr-2 w-4 h-4"/>
                         View Profile NFT on OpenSea
                    </a>
                    <a
                        href={`https://opensea.io/assets/matic/0xe7e7ead361f3aacd73a61a9bd6c10ca17f38e945/${BigInt(`${profile.handle?.id}`).toString()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                    >
                        <img src="https://opensea.io/static/images/logos/opensea-logo.svg" alt="OpenSea Logo" className="mr-2 w-4 h-4"/>
                         View Handle NFT on OpenSea
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
