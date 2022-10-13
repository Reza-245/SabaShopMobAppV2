def unicodeConverter(query):
    byteCodes =[str(ord(c)) for c in query]
    byteCodes_str = "|".join(byteCodes)
    Kdone = byteCodes_str.replace("1705","1603")
    Edone = Kdone.replace("1740","1610")
    stringList = [chr(int(c)) for c in Edone.split("|")]
    query = "".join(stringList)
    return query