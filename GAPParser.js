// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.GAPParser = factory();
  }
}(this, function () {

    var ret = function GAPParser(packet) {
        var data = null;
        switch(typeof packet) {
            case 'string':
                data = new Uint8Array(Math.floor(packet.length / 2));
                var i = 0;
                packet.replace(/(..)/g, function(str) {
                    data[i++] = parseInt(str, 16);
                });
                break;
        }
        if(data === null) {
            return null;
        }
        var fields = [];
        for(var i = 0; i < data.length;) {
            var len = data[i];
            if(len === 0 || data.length === i + 1) {
                break;
            }
            var type = data[i+1];
            var fieldData = data.slice(i+2, i + 1 + len);
            fields.push(new ret.GAPField(type, fieldData));
            i += len + 1;
        }
        return fields;
    };

    ret.GAPField = function GAPField(type, data) {
        this.type = type;
        this.data = data;
    };

    ret.GAPField.types = {
        FLAGS: 0x01,
        UUIDS_INCOMPLETE_16: 0x02,
        UUIDS_COMPLETE_16: 0x03,
        UUIDS_INCOMPLETE_32: 0x04,
        UUIDS_COMPLETE_32: 0x05,
        UUIDS_INCOMPLETE_128: 0x06,
        UUIDS_COMPLETE_128: 0x07,
        NAME_SHORT: 0x08,
        NAME_COMPLETE: 0x09,
        TX_POWER: 0x0A,
        DEVICE_CLASS: 0x0D,
        SIMPLE_PAIRING_HASH_C: 0x0E,
        SIMPLE_PAIRING_RANDOMIZER_R: 0x0F,
        DEVICE_ID: 0x10,
        SECURITY_MANAGER_OOB_FLAGS: 0x11,
        SLAVE_CONNECTION_INTERVAL_RANGE: 0x12,
        UUIDS_SERVICE_SOLICITATION_16: 0x14,
        UUIDS_SERVICE_SOLICITATION_32: 0x15,
        UUIDS_SERVICE_SOLICITATION_128: 0x16,
        SERVICE_DATA_16: 0x16,
        SERVICE_DATA_32: 0x20,
        SERVICE_DATA_128: 0x21,
        LE_SECURE_CONNECTIONS_CONFIRMATION_VAL: 0x22,
        LE_SECURE_CONNECTIONS_RANDOM_VAL: 0x23,
        TARGET_ADDRESS_PUBLIC: 0x17,
        TARGET_ADDRESS_RANDOM: 0x18,
        APPEARANCE: 0x19,
        ADVERTISING_INTERVAL: 0x1A,
        LE_BLUETOOTH_DEVICE_ADDRESS: 0x1B,
        LE_ROLE: 0x1C,
        SIMPLE_PAIRING_HASH_C256: 0x1D,
        SIMPLE_PAIRING_RANDOMIZER_R256: 0x1E,
        THREED_INFORMATION_DATA: 0x3D,
        MANUFACTURER_DATA: 0xFF
    };

    ret.GAPField.typeToStringMap = {};
    ret.GAPField.typeToStringMap[ret.GAPField.types.FLAGS] = 'Flags';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_INCOMPLETE_16] = 'Incomplete List of 16-bit Service Class UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_COMPLETE_16] = 'Complete List of 16-bit Service Class UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_INCOMPLETE_32] = 'Incomplete List of 32-bit Service Class UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_COMPLETE_32] = 'Complete List of 32-bit Service Class UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_INCOMPLETE_128] = 'Incomplete List of 128-bit Service Class UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_COMPLETE_128] = 'Complete List of 128-bit Service Class UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.NAME_SHORT] = 'Shortened Local Name';
    ret.GAPField.typeToStringMap[ret.GAPField.types.NAME_COMPLETE] = 'Complete Local Name';
    ret.GAPField.typeToStringMap[ret.GAPField.types.TX_POWER] = 'Tx Power Level';
    ret.GAPField.typeToStringMap[ret.GAPField.types.DEVICE_CLASS] = 'Class of Device';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SIMPLE_PAIRING_HASH_C] = 'Simple Pairing Hash C';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SIMPLE_PAIRING_RANDOMIZER_R] = 'Simple Pairing Randomizer R';
    ret.GAPField.typeToStringMap[ret.GAPField.types.DEVICE_ID] = 'Device ID';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SECURITY_MANAGER_OOB_FLAGS] = 'Security Manager Out of Band Flags';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SLAVE_CONNECTION_INTERVAL_RANGE] = 'Slave Connection Interval Range';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_SERVICE_SOLICITATION_16] = 'List of 16-bit Service Solicitation UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_SERVICE_SOLICITATION_32] = 'List of 32-bit Service Solicitation UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.UUIDS_SERVICE_SOLICITATION_128] = 'List of 128-bit Service Solicitation UUIDs';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SERVICE_DATA_16] = 'Service Data';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SERVICE_DATA_32] = 'Service Data - 32-bit UUID';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SERVICE_DATA_128] = 'Service Data - 128-bit UUID';
    ret.GAPField.typeToStringMap[ret.GAPField.types.LE_SECURE_CONNECTIONS_CONFIRMATION_VAL] = 'LE Secure Connections Confirmation Value';
    ret.GAPField.typeToStringMap[ret.GAPField.types.LE_SECURE_CONNECTIONS_RANDOM_VAL] = 'LE Secure Connections Random Value';
    ret.GAPField.typeToStringMap[ret.GAPField.types.TARGET_ADDRESS_PUBLIC] = 'Public Target Address';
    ret.GAPField.typeToStringMap[ret.GAPField.types.TARGET_ADDRESS_RANDOM] = 'Random Target Address';
    ret.GAPField.typeToStringMap[ret.GAPField.types.APPEARANCE] = 'Appearance';
    ret.GAPField.typeToStringMap[ret.GAPField.types.ADVERTISING_INTERVAL] = 'Advertising Interval';
    ret.GAPField.typeToStringMap[ret.GAPField.types.LE_BLUETOOTH_DEVICE_ADDRESS] = '​LE Bluetooth Device Address';
    ret.GAPField.typeToStringMap[ret.GAPField.types.LE_ROLE] = 'LE Role';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SIMPLE_PAIRING_HASH_C256] = 'Simple Pairing Hash C-256';
    ret.GAPField.typeToStringMap[ret.GAPField.types.SIMPLE_PAIRING_RANDOMIZER_R256] = 'Simple Pairing Randomizer R-256';
    ret.GAPField.typeToStringMap[ret.GAPField.types.THREED_INFORMATION_DATA] = '3D Information Data';
    ret.GAPField.typeToStringMap[ret.GAPField.types.MANUFACTURER_DATA] = 'Manufacturer Specific Data';

    var formatHex = function(num) {
        return (num < 16 ? '0' : '')+num.toString(16);
    };

    ret.GAPField.prototype = {

        typeHex: function() {
            return formatHex(this.type);
        },
        dataHex: function() {
            var s = '';
            for(var i = 0; i < this.data.length; i++) {
                s += formatHex(this.data[i]);
            }
            return s;
        },
        _UUIDStrings: function(length) {
            var strings = [];
            for(var i = 0; i < Math.floor(this.data.length / length); i++) {
                var offset = i * length;
                var s = '';
                for(var j = 0; j < length; j++) {
                    s += formatHex(this.data[offset + j]);
                    if(j === 3 || j === 5 || j === 7 || j === 9) {
                        s += '-';
                    }
                }
                strings.push(s);
            }
            return strings.join(', ');
        },
        validate: function() {
            switch(this.type) {
                case ret.GAPField.types.FLAGS:
                    return this.data.length === 1;
            }
            return this.data.length > 0;
        },
        typeDescription: function() {
            return ret.GAPField.typeToStringMap[this.type] || 'Unknown';
        },
        dataDescription: function() {
            if(!this.validate()) {
                return 'INVALID!';
            }
            switch(this.type) {
                case ret.GAPField.types.FLAGS:
                    var flags = [];
                    if(this.data[0] & 0x01) {
                        flags.push('LE Limited Discoverable Mode');
                    }
                    if(this.data[0] & 0x02) {
                        flags.push('LE General Discoverable Mode');
                    }
                    if(this.data[0] & 0x04) {
                        flags.push('BR/EDR Not Supported');
                    }
                    if(this.data[0] & 0x08) {
                        flags.push('Simultaneous LE and BR/EDR to Same Device Capable (Controller)');
                    }
                    if(this.data[0] & 0x10) {
                        flags.push('Simultaneous LE and BR/EDR to Same Device Capable (Host)');
                    }
                    return flags.join(', ');
                case ret.GAPField.types.UUIDS_INCOMPLETE_16:
                case ret.GAPField.types.UUIDS_COMPLETE_16:
                case ret.GAPField.types.UUIDS_SERVICE_SOLICITATION_16:
                    return this._UUIDStrings(2);
                case ret.GAPField.types.UUIDS_INCOMPLETE_32:
                case ret.GAPField.types.UUIDS_COMPLETE_32:
                case ret.GAPField.types.UUIDS_SERVICE_SOLICITATION_32:
                    return this._UUIDStrings(4);
                case ret.GAPField.types.UUIDS_INCOMPLETE_128:
                case ret.GAPField.types.UUIDS_COMPLETE_128:
                case ret.GAPField.types.UUIDS_SERVICE_SOLICITATION_128:
                    return this._UUIDStrings(16);
                case ret.GAPField.types.NAME_SHORT:
                case ret.GAPField.types.NAME_COMPLETE:
                    return decodeURIComponent(escape(String.fromCharCode.apply(null, this.data)));
            }
            return null;
        }
    }
    
    return ret;
}));