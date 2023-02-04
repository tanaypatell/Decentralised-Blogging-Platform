// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract BlogFactory {
    uint256 blogCount;

    event NewBlog(
        uint256 blogId,
        string title,
        string content,
        string heroImageHash,
        uint256 blogHash
    );

    struct Blog {
        string title;
        string content;
        string heroImageHash;
        address publisher;
        uint256 blogHash;
        //We have to add timestap later....
    }

    Blog[] public blogs;

    uint256 randNonce = 0; // for Generating BlogHash
    // declare mappings here
    mapping(uint256 => address) public blogToOwner;
    mapping(address => uint256) public userBlogCount;
    mapping(uint256 => Blog) public blogHashToBlog;

    // function setImage(string memory x) public {
    //     ipfsHash = x;
    // }

    // function getImage() public view returns (string memory) {
    //     return ipfsHash;
    // }

    function _publishBlog(
        string memory _title,
        string memory _content,
        string memory _heroImageHash,
        uint256 _blogHash
    ) private {
        blogs.push(
            Blog(_title, _content, _heroImageHash, msg.sender, _blogHash)
        );
        uint256 id = blogs.length - 1;
        blogHashToBlog[_blogHash] = blogs[id];
        blogToOwner[id] = msg.sender;
        userBlogCount[msg.sender]++;
        blogCount += 1;
        emit NewBlog(id, _title, _content, _heroImageHash, _blogHash);
    }

    function _generateBlogHash() internal returns (uint256) {
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            );
    }

    function createBlog(
        string memory _title,
        string memory _content,
        string memory _heroImageHash
    ) public {
        //uint randDna = _generateBlogHash(_name);
        uint256 blogHash = _generateBlogHash();
        _publishBlog(_title, _content, _heroImageHash, blogHash);
    }

    function getBlog(uint256 blogIndex)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address,
            uint256
        )
    {
        return (
            blogs[blogIndex].title,
            blogs[blogIndex].content,
            blogs[blogIndex].heroImageHash,
            blogs[blogIndex].publisher,
            blogs[blogIndex].blogHash
        );
    }

    function getBlogCount() public view returns (uint256) {
        return blogCount;
    }

    function getAllBlogs() public view returns (Blog[] memory) {
        return blogs;
    }

    function st2num(string memory numString) public pure returns (uint256) {
        uint256 val = 0;
        bytes memory stringBytes = bytes(numString);
        for (uint256 i = 0; i < stringBytes.length; i++) {
            uint256 exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
            uint256 jval = uval - uint256(0x30);

            val += (uint256(jval) * (10**(exp - 1)));
        }
        return val;
    }

    function getBlogFromBlogHash(string memory _blogHash)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address
        )
    {
        uint256 bloghashInt = st2num(_blogHash);
        return (
            blogHashToBlog[bloghashInt].title,
            blogHashToBlog[bloghashInt].content,
            blogHashToBlog[bloghashInt].heroImageHash,
            blogHashToBlog[bloghashInt].publisher
        );
    }
}
