const resource = {
  Resources: {
    VPC: {
      Type: 'AWS::EC2::VPC',
      Properties: {
        CidrBlock: '${self:custom.database.cidr}.0.0.0/16',
        EnableDnsSupport: true,
        EnableDnsHostnames: true,
        InstanceTenancy: 'default',
      },
    },
    InternetGateway: {
      Type: 'AWS::EC2::InternetGateway',
    },
    AttachGateway: {
      Type: 'AWS::EC2::VPCGatewayAttachment',
      Properties: {
        VpcId: {
          Ref: 'VPC',
        },
        InternetGatewayId: {
          Ref: 'InternetGateway',
        },
      },
    },
    SecurityGroup: {
      Type: 'AWS::EC2::SecurityGroup',
      Properties: {
        GroupDescription: 'Allow HTTP client to connect to our database',
        VpcId: {
          Ref: 'VPC',
        },
        SecurityGroupIngress: [
          {
            IpProtocol: -1,
            FromPort: 0,
            ToPort: 65535,
            CidrIp: '0.0.0.0/0',
          },
        ],
      },
    },
    SubnetA: {
      Type: 'AWS::EC2::Subnet',
      Properties: {
        VpcId: {
          Ref: 'VPC',
        },
        AvailabilityZone: '${self:provider.region}a',
        CidrBlock: '${self:custom.database.cidr}.0.0.0/24',
        MapPublicIpOnLaunch: true,
      },
    },
    SubnetB: {
      Type: 'AWS::EC2::Subnet',
      Properties: {
        VpcId: {
          Ref: 'VPC',
        },
        AvailabilityZone: '${self:provider.region}b',
        CidrBlock: '${self:custom.database.cidr}.0.1.0/24',
        MapPublicIpOnLaunch: true,
      },
    },
    SubnetC: {
      Type: 'AWS::EC2::Subnet',
      Properties: {
        VpcId: {
          Ref: 'VPC',
        },
        AvailabilityZone: '${self:provider.region}c',
        CidrBlock: '${self:custom.database.cidr}.0.2.0/24',
        MapPublicIpOnLaunch: true,
      },
    },
    RouteTable: {
      Type: 'AWS::EC2::RouteTable',
      Properties: {
        VpcId: {
          Ref: 'VPC',
        },
      },
    },
    RouteTableAssociationA: {
      Type: 'AWS::EC2::SubnetRouteTableAssociation',
      Properties: {
        SubnetId: {
          Ref: 'SubnetA',
        },
        RouteTableId: {
          Ref: 'RouteTable',
        },
      },
    },
    RouteTableAssociationB: {
      Type: 'AWS::EC2::SubnetRouteTableAssociation',
      Properties: {
        SubnetId: {
          Ref: 'SubnetB',
        },
        RouteTableId: {
          Ref: 'RouteTable',
        },
      },
    },
    RouteTableAssociationC: {
      Type: 'AWS::EC2::SubnetRouteTableAssociation',
      Properties: {
        SubnetId: {
          Ref: 'SubnetC',
        },
        RouteTableId: {
          Ref: 'RouteTable',
        },
      },
    },
    InternetRoute: {
      Type: 'AWS::EC2::Route',
      Properties: {
        RouteTableId: {
          Ref: 'RouteTable',
        },
        GatewayId: {
          Ref: 'InternetGateway',
        },
        DestinationCidrBlock: '0.0.0.0/0',
      },
    },
  },
};

export default resource;
